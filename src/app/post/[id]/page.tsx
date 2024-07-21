import { Metadata } from "next";
import axios from "axios";
import { PostType, Comment } from "@/app/types/types";
import styles from "../styles/Post.module.scss";
interface PostPageProps {
  params: {
    id: string;
  };
}

const fetchPostData = async (id: string) => {
  const postResponse = await axios.get<PostType>(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
  );
  const commentsResponse = await axios.get<Comment[]>(
    `https://jsonplaceholder.typicode.com/comments?postId=${id}`,
  );
  return {
    post: postResponse.data,
    comments: commentsResponse.data,
  };
};

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { post } = await fetchPostData(params.id);
  return {
    title: post.title,
    description: post.body,
  };
}

const PostPage = async ({ params }: PostPageProps) => {
  const { id } = params;
  const { post, comments } = await fetchPostData(id);

  return (
    <div className={styles.container}>
      {/*<NextSeo title={post.title} description={post.body} />
        Сделал всё кроме next-seo, время поджимало, понимаю, что в серверных компонентах не работает,
        Не пришла пока мысль как это нормально реализовать
        */}
      <h1 className={styles["post-title"]}>{post.title}</h1>
      <p className={styles["post-body"]}>{post.body}</p>

      <h2 className={styles["comments-title"]}>Comments</h2>
      <ul className={styles["comment-list"]}>
        {comments.map((comment) => (
          <li key={comment.id} className={styles["comment-item"]}>
            <strong className={styles["comment-author"]}>
              {comment.name}:
            </strong>
            <span className={styles["comment-body"]}>{comment.body}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostPage;
