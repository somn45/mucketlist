interface GenreProps {
  genre: string;
}

function Genre({ genre }: GenreProps) {
  return (
    <>
      <input type="checkbox" name={genre} value={genre} />
      {genre}
    </>
  );
}

export default Genre;
