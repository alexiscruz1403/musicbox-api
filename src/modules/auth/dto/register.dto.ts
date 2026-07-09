import {
  Equals,
  IsBoolean,
  IsEmail,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @Length(3, 30)
  @Matches(/^[a-zA-Z0-9_]{3,30}$/, {
    message: 'handle solo puede contener letras, números y guiones bajos.',
  })
  handle: string;

  @IsString()
  @Length(1, 50)
  displayName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsBoolean()
  @Equals(true, {
    message:
      'Debés aceptar los Términos de Servicio y la Política de Privacidad.',
  })
  consent!: boolean;
}
