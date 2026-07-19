import {
  IsBoolean,
  IsIn,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class UpdateProfileDto {
  @IsOptional()
  @IsString({ message: i18nValidationMessage('validation.IS_STRING') })
  @Length(3, 30, { message: i18nValidationMessage('validation.LENGTH') })
  @Matches(/^[a-zA-Z0-9_]{3,30}$/, {
    message: i18nValidationMessage('validation.HANDLE_MATCHES'),
  })
  handle?: string;

  @IsOptional()
  @IsString({ message: i18nValidationMessage('validation.IS_STRING') })
  @Length(1, 50, { message: i18nValidationMessage('validation.LENGTH') })
  displayName?: string;

  @IsOptional()
  @IsString({ message: i18nValidationMessage('validation.IS_STRING') })
  @Length(0, 300, { message: i18nValidationMessage('validation.LENGTH') })
  bio?: string;

  @IsOptional()
  @IsBoolean({ message: i18nValidationMessage('validation.IS_BOOLEAN') })
  isPrivate?: boolean;

  // Fase 9 — Internacionalización (docs/fase-9-features.md).
  @IsOptional()
  @IsIn(['EN', 'ES'], { message: i18nValidationMessage('validation.IS_IN') })
  language?: 'EN' | 'ES';
}
