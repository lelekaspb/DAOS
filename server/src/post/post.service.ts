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

  async getPosts(filterObject: any) {
    let posts: Post[] = [];
    if (filterObject.posts === 'all' && filterObject.instrument === 'all') {
      posts = await this.postModel
        .find({})
        .populate('creator_id', ['firstName', 'lastName'])
        .exec();
    } else if (
      filterObject.posts === 'all' &&
      filterObject.instrument !== 'all'
    ) {
      posts = await this.postModel
        .find({ instrument: filterObject.instrument })
        .populate('creator_id', ['firstName', 'lastName'])
        .exec();
    } else if (
      filterObject.instrument === 'all' &&
      filterObject.posts !== 'all'
    ) {
      const postsType = filterObject.posts === 'ensembles' ? 'looking' : 'play';
      posts = await this.postModel
        .find({ type: postsType })
        .populate('creator_id', ['firstName', 'lastName'])
        .exec();
    } else {
      const postsType = filterObject.posts === 'ensembles' ? 'looking' : 'play';
      posts = await this.postModel
        .find({ type: postsType, instrument: filterObject.instrument })
        .populate('creator_id', ['firstName', 'lastName'])
        .exec();
    }

    return {
      success: true,
      status: HttpStatus.OK,
      posts: posts,
    };
  }
}
