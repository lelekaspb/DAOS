import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDto } from './post.dto';
import { Post, PostDocument } from './post.schema';
import { UserService } from './../user/user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private readonly userService: UserService,
  ) {}

  async createPost(postDto: PostDto) {
    try {
      const post = new this.postModel(postDto);
      const savedPost = await post.save();
      // add post to user
      const postAdded = await this.userService.addPostToUser(
        savedPost.creator_id,
        savedPost._id,
      );

      if (postAdded.success) {
        const { description, creator_id, updatedAt, __v, ...result } =
          savedPost.toObject();

        return {
          success: true,
          status: HttpStatus.CREATED,
          post: result,
        };
      } else {
        throw new HttpException(
          {
            success: false,
            status: HttpStatus.SERVICE_UNAVAILABLE,
            message: 'Kunne ikke tilføj opslag til brugeren',
          },
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }
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
