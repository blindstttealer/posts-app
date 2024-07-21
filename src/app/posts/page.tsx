import Link from "next/link";
import axios from "axios";
import styles from "./styles/Page.module.scss";
import classNames from "classnames";
import { FC } from "react";
import { PostType } from "@/app/types/types";

const postTotal = 100;
const postLimit = 10;
const postPages = Math.ceil(postTotal / postLimit);
const pagePagination = Array.from({ length: postPages }, (_, i) => i + 1);
interface PostsProps {
  searchParams: {
    page: string;
  };
}
async function fetchPosts(page: number = 1, limit: number = postLimit) {
  const response = await axios.get<PostType[]>(
    `https://jsonplaceholder.typicode.com/posts?_start=${(page - 1) * limit}&_limit=${limit}`,
  );

  return response.data;
}

const Posts: FC<PostsProps> = async ({ searchParams, ...props }) => {
  const myPosts = await fetchPosts(parseInt(searchParams.page));

  return (
    <div className={styles.wrapper}>
      <div className={styles.paginationWrapper}>
        {pagePagination.map((page) => (
          <Link
            href={`/posts?page=${page || 1}`}
            key={page}
            className={styles.link}
          >
            <div
              className={classNames(styles.pageLink, {
                [styles.active]: parseInt(searchParams.page || "1") === page,
              })}
              key={page}
            >
              {page}
            </div>
          </Link>
        ))}
      </div>
      {myPosts?.map((post) => (
        <div key={post.id} className={styles.title}>
          <Link href={`/post/${post.id}`}>
            {post.id}) {post.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Posts;
