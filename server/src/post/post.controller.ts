import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './post.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  //   @UseInterceptors(OnlySameUserByIdAllowed) - TODO: make another interceptor that would compare creator id from body and id from jwt
  @Post()
  createPost(@Body() postDto: PostDto) {
    return this.postService.createPost(postDto);
  }
}
