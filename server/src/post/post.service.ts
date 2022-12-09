import {
  HttpException,
  HttpStatus,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDto } from './post.dto';
import { Post, PostDocument } from './post.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async createPost(postDto: PostDto) {
    try {
      const result = new this.postModel(postDto);
      await result.save();

      return {
        success: true,
        status: HttpStatus.CREATED,
        post: result,
      };
    } catch (err) {
      throw new HttpException(
        {
          success: false,
          status: HttpStatus.SERVICE_UNAVAILABLE,
          message: 'Kunne ikke oprette opslag',
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
