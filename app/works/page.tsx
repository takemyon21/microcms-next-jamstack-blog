// works/page.tsx
import Link from "next/link";
import { client } from "../../libs/microcms";

// ブログ記事の型定義
type Props = {
  id: string;
  title: string;
};

async function getWorksPosts(): Promise<Props[]> {
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
  const works = await getWorksPosts();

  return (
    <main>
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
