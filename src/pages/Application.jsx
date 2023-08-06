import { useScreen } from '../context/screen.context';

const Application = () => {
  const { height, width } = useScreen();
  console.log(height, width);
  return <div>User App</div>;
};
export default Application;
