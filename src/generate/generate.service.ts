import { Injectable } from '@nestjs/common';
import { CreateGenerateDto } from './dto/create-generate.dto';
import { UpdateGenerateDto } from './dto/update-generate.dto';
var fs = require('fs');
var ejs = require('ejs');
var pdf = require('html-pdf');

@Injectable()
export class GenerateService {
  create(createGenerateDto: CreateGenerateDto) {
    return 'This action adds a new generate';
  }

  findAll(res) {
    var compiled = ejs.compile(
      fs.readFileSync(process.cwd() + '/templates/pdf-invoice.html', 'utf8'),
    );

    var html = compiled({
      address1: 'bangkok',
      state1: 'TH',
      invoiceNo: '123445590',
    });

    var options = { format: 'A4' };

    return pdf.create(html, options).toBuffer(function (err, buffer) {
      if (err) return console.log(err);
      var pdfBuffer = Buffer.from(buffer);

      res.send(pdfBuffer);
    });
    // const compiledPost = ejs.compile(
    //   fs.readFileSync(process.cwd() + '/templates/pdf-invoice.html', 'utf8'),
    // );
    // const htmlPostTemplate = compiledPost({ invoiceId: 'INV000000000' });
    // var optionsPost = {
    //   format: 'A4',
    //   orientation: 'portrait',
    // };
    // var documentPost = {
    //   html: htmlPostTemplate,
    //   data: { invoiceId: 'INV000000000' },
    //   path: './output.pdf',
    //   type: 'buffer',
    // };

    // return pdf.create(documentPost, optionsPost);

    // return `This action returns all generate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} generate`;
  }

  update(id: number, updateGenerateDto: UpdateGenerateDto) {
    return `This action updates a #${id} generate`;
  }

  remove(id: number) {
    return `This action removes a #${id} generate`;
  }
}
