/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsArray,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class ProductDto {
  @ApiProperty({ description: 'ID único do produto' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Nome do produto' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Descrição detalhada do produto' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Preço do produto' })
  @IsString()
  price: string;

  @ApiProperty({ description: 'Categoria do produto' })
  @IsString()
  category: string;

  @ApiProperty({ description: 'URL da imagem do produto' })
  @IsString()
  image: string;

  @ApiProperty({ description: 'Material de fabricação do produto' })
  @IsString()
  material: string;

  @ApiProperty({ description: 'Departamento do produto' })
  @IsString()
  department: string;

  @ApiProperty({ description: 'Fornecedor do produto (brazilian ou european)' })
  @IsString()
  provider: string;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'Nome do cliente',
    example: 'João Silva',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email do cliente',
    example: 'joao.silva@exemplo.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Lista de produtos no pedido',
    type: [ProductDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  items: ProductDto[];

  @ApiProperty({
    description: 'Valor total do pedido',
    example: 299.99,
  })
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  totalPrice: number;
}
