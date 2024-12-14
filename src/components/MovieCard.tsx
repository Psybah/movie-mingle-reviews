import { Card } from "@/components/ui/card";

interface MovieCardProps {
  title: string;
  year: string;
  poster: string;
  rating: number;
  onClick: () => void;
}

export const MovieCard = ({ title, year, poster, rating, onClick }: MovieCardProps) => {
  return (
    <Card 
      className="movie-card overflow-hidden cursor-pointer bg-card hover:bg-card/80"
      onClick={onClick}
    >
      <div className="aspect-[2/3] relative">
        <img 
          src={poster} 
          alt={title}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-2 right-2 bg-background/80 px-2 py-1 rounded-full text-sm">
          ★ {rating.toFixed(1)}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold truncate">{title}</h3>
        <p className="text-sm text-muted-foreground">{year}</p>
      </div>
    </Card>
  );
};