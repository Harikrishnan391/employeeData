import { Injectable } from '@nestjs/common';
import * as xlsx from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import { rejects } from 'assert';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}
  
  async processUpload(filePath: string) {
    console.log(filePath);
    if (!filePath) {
      return { message: 'No file uploaded' };
    }

    try {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(sheet);

      for (const row of data) {
        const employeeId = row['Employee Id'];
        const employeeName = row['Employee Name'];
        const role = row['Role'];
        const address = row['Address'];
        const profileUrl = row['ProfileUrl'];

        const profileImagePath = await this.downloadProfileImage(
          profileUrl,
          employeeId,
        );

        const employee = await this.prisma.employee;

        console.log(profileImagePath, 'profile imagePath');
      }

      // console.log('workbook', workbook);
    } catch (error) {
      console.log(error);
    }
  }

  ////dOWNLOAD pROFILEiMAGE

  async downloadProfileImage(url: string, employeeId: number): Promise<string> {
    const folderPath = './uploads/profile-images';
    const imagePath = path.join(folderPath, `${employeeId}.jpg`);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const writer = fs.createWriteStream(imagePath);

    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve(imagePath));
      writer.on('error', reject);
    });
  }
}
