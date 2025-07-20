

interface CardProps {
  name: string;
  description: string;
  onClick?: () => void;
}

export default function Card({ name, description, onClick }: CardProps) {
  return (
    <div
      className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition cursor-pointer border"
      onClick={onClick}
    >
      <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
    </div>
  );
}
