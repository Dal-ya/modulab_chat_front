const AuthorCard = ({
  author,
  onClick,
}: {
  author: { name: string; desc: string; img: string; isActive: boolean };
  onClick: () => void;
}) => {
  return (
    <div
      className={`card w-52 h-64 bg-base-100 shadow-xl mb-10  cursor-pointer hover:ring-4 hover:ring-sky-500 ${
        author.isActive ? 'ring-4 ring-sky-500' : ''
      }`}
      onClick={onClick}
    >
      <figure>
        <img src={author.img} alt={author.name + "'s image"} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{author.name}</h2>
        <p>{author.desc}</p>
      </div>
    </div>
  );
};

export default AuthorCard;

// https://upload.wikimedia.org/wikipedia/commons/a/a8/Nighthawks_by_Edward_Hopper_1942.jpg
