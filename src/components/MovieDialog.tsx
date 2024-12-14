import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface MovieDialogProps {
  movie: {
    title: string;
    year: string;
    poster: string;
    rating: number;
    plot: string;
    director: string;
    cast: string[];
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MovieDialog = ({ movie, open, onOpenChange }: MovieDialogProps) => {
  const [review, setReview] = useState("");
  const { toast } = useToast();

  if (!movie) return null;

  const handleSubmitReview = () => {
    if (!review.trim()) {
      toast({
        title: "Review cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Review submitted!",
      description: "Thank you for your feedback.",
    });
    setReview("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>{movie.title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full pr-4">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={movie.poster}
              alt={movie.title}
              className="rounded-lg w-full md:w-64 object-cover"
            />
            <div className="flex-1">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold">Plot</h4>
                  <p className="text-muted-foreground">{movie.plot}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Director</h4>
                  <p className="text-muted-foreground">{movie.director}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Cast</h4>
                  <p className="text-muted-foreground">{movie.cast.join(", ")}</p>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <h4 className="font-semibold">Write a Review</h4>
                <Textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Share your thoughts about the movie..."
                  className="min-h-[100px]"
                />
                <Button onClick={handleSubmitReview}>Submit Review</Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};