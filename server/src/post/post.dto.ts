import { Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PostDto {
  @Prop()
  @IsNotEmpty({ message: 'Opslagstitel må ikke være tom' })
  @IsString({ message: 'Opslagstitel skal være en streng' })
  title: string;

  @Prop()
  @IsNotEmpty({ message: 'Opslagstypen må ikke være tom' })
  @IsString({ message: 'Opslagstypen skal være en streng' })
  type: string;

  @Prop()
  @IsNotEmpty({ message: 'Instrumentet må ikke være tomt' })
  @IsString({ message: 'Instrumentet skal være en streng' })
  instrument: string;

  @Prop()
  @IsOptional()
  @IsString({ message: 'Beskrivelsen skal være en streng' })
  description: string;

  @Prop()
  @IsNotEmpty({ message: 'Område må ikke være tomt' })
  @IsString({ message: 'Område skal være en streng' })
  location: string;

  @Prop()
  @IsOptional()
  @IsString({ message: 'Ensemblenavn skal være en streng' })
  orchestraName: string;

  @Prop()
  @IsOptional()
  @IsString({ message: 'Hjemmeside skal være en streng' })
  website: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @IsNotEmpty({ message: 'Creator id cannot be empty' })
  creator_id: string;

  constructor(
    title: string,
    type: string,
    instrument: string,
    description: string,
    location: string,
    orchestraName: string,
    website: string,
    creator_id: string,
  ) {
    this.title = title;
    this.type = type;
    this.instrument = instrument;
    this.description = description;
    this.location = location;
    this.orchestraName = orchestraName;
    this.website = website;
    this.creator_id = creator_id;
  }
}
