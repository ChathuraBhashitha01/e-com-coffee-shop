import Card from 'react-bootstrap/Card';
import Logo from "../assets/coffe_shop_logo.png";

function Item() {
  return (
    <Card className='min-w-[210px] max-w-[210px] h-[385px] shadow-xl'>
      <div className=' w-[100%] h-[50px] flex flex-row items-center justify-center'>
        <img className='h-[50px] ' src={Logo} />
      </div>
      
      <Card.Img variant="top" className=' w-[100%] h-[160px]' src={Logo} />
      <Card.Body>
        <Card.Title className=' text-[20px] italic ml-5'>Black Coffee</Card.Title>
        <Card.Text className=' text-[16px]'>
            Simply brewed coffee without milk or sugar
        </Card.Text>
        <Card.Text className=' text-[20px] text-[#DD3638] ml-5'>Rs.1250.50</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Item;