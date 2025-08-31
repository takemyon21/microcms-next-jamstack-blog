// app/page.tsx
import Link from "next/link";
import { client } from "../libs/microcms";

// ブログ記事の型定義
type Props = {
  id: string;
  title: string;
};

// microCMSからブログ記事を取得
async function getBlogPosts(): Promise<Props[]> {
  const data = await client.get({
    endpoint: "blog", // 'blog'はmicroCMSのエンドポイント名
    queries: {
      fields: "id,title", // idとtitleを取得
      limit: 5, // 最新の5件を取得
    },
  });
  return data.contents;
}

async function getBloWorks(): Promise<Props[]> {
  const data = await client.get({
    endpoint: "works", // 'works'はmicroCMSのエンドポイント名
    queries: {
      fields: "id,title", // idとtitleを取得
      limit: 5, // 最新の5件を取得
    },
  });
  return data.contents;
}

export default async function Home() {
  const posts = await getBlogPosts();
  const works = await getBloWorks();

  return (
    <main>
      <h1>ブログ記事一覧</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`}>
              {" "}
              {/* 記事へのリンクを生成 */}
              {post.title} {/* タイトルを表示 */}
            </Link>
          </li>
        ))}
      </ul>
      <h1>制作実績一覧</h1>
      <ul>
        {works.map((work) => (
          <li key={work.id}>
            <Link href={`/works/${work.id}`}>
              {" "}
              {/* 記事へのリンクを生成 */}
              {work.title} {/* タイトルを表示 */}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
