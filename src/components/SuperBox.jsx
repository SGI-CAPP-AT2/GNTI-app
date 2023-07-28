import { Box } from "@primer/react";
/**
 * A SuperBox Parent for all Boxes & layouts on Page for bg
 */
const SuperBox = ({
    children,
    ...props
}) =>{
return <Box bg="canvas.default" {...props}>
    {children}
</Box>
};
export default SuperBox;