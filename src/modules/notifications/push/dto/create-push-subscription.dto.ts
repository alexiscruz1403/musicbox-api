import { Type } from 'class-transformer';
import { IsString, IsUrl, ValidateNested, MinLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

class PushSubscriptionKeysDto {
  @IsString({ message: i18nValidationMessage('validation.IS_STRING') })
  @MinLength(1, { message: i18nValidationMessage('validation.MIN_LENGTH') })
  p256dh!: string;

  @IsString({ message: i18nValidationMessage('validation.IS_STRING') })
  @MinLength(1, { message: i18nValidationMessage('validation.MIN_LENGTH') })
  auth!: string;
}

export class CreatePushSubscriptionDto {
  @IsUrl(
    { require_tld: false },
    { message: i18nValidationMessage('validation.IS_URL') },
  )
  endpoint!: string;

  @ValidateNested({
    message: i18nValidationMessage('validation.VALIDATE_NESTED'),
  })
  @Type(() => PushSubscriptionKeysDto)
  keys!: PushSubscriptionKeysDto;
}
