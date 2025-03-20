import Card from 'react-bootstrap/Card';
import Logo from "../assets/coffe_shop_logo.png";

interface ItemProps {
  name: string;
  price: number;
  description: string;
}

export default function Item({ name, price, description }: ItemProps) {
  return (
    <Card className='min-w-[210px] max-w-[210px] h-[385px] shadow-xl'>
      <div className=' w-[100%] h-[50px] flex flex-row items-center justify-center'>
        <img className='h-[50px]' src={Logo} alt="Logo" />
      </div>
      
      <Card.Img variant="top" className=' w-[100%] h-[160px]' src={Logo} alt="Item Image" />
      
      <Card.Body>
        <Card.Title className=' text-[20px] italic ml-5'>{name}</Card.Title>
        <Card.Text className=' text-[16px]'>
          {description}
        </Card.Text>
        <Card.Text className=' text-[20px] text-[#DD3638] ml-5'>Rs.{price}</Card.Text>
      </Card.Body>
    </Card>
  );
}