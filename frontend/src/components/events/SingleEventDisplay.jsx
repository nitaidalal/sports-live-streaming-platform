function SingleEventDisplay({ match }) {
  return (
    <div className="font-medium">
      {match.event || match.title}
    </div>
  );
}

export default SingleEventDisplay;