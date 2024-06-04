import Image from "next/image";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
// import { IItem } from "./Result";
import Link from "next/link";
import { IItem } from "@/model/types";

export default function CarouselItemComponent({ item }: { item: IItem }) {
  const isMovie = item.media_type === "movie";

  const href = isMovie ? `/movies/${item.id}` : `/tv/${item.id}`;
  return (
    <Link href={href}>
      <Card className="flex-card-cal">
        <div>
          <Image
            loading="lazy"
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={item.original_title || item.name}
            className="object-cover rounded"
            width={300}
            height={300}
          />
        </div>
        <CardHeader>
          <CardTitle>{item.original_title || item.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {item.first_air_date || item.release_date}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
