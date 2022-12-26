import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './post.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { OnlyPostCreatorAllowed } from './../auth/user.interceptor';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createPost(@Body() postDto: PostDto) {
    return this.postService.createPost(postDto);
  }

  @Post('/find')
  getPosts(@Body() filterObject: any) {
    return this.postService.getPosts(filterObject);
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    console.log('post id ' + id);
    return this.postService.getPostById(id);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(OnlyPostCreatorAllowed)
  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(OnlyPostCreatorAllowed)
  @Put(':id')
  updatePost(@Param('id') postId: string, @Body() postData: PostDto) {
    return this.postService.updatePost(postId, postData);
  }
}
