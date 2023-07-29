import { Checkbox, FormControl, Tooltip } from '@primer/react';
const TnCTooltipBtn = ({ value, setValue }) => {
  return (
    <>
      <FormControl
        sx={{
          margin: '10px',
        }}
      >
        <Checkbox
          checked={value}
          onChange={box => {
            setValue(box.target.checked);
          }}
          id="default-checkbox"
        />
        <FormControl.Label>
          By Signing in or Signing up I allow to collect{' '}
          <Tooltip aria-label="Email, Name, Avatar"> My Data </Tooltip>
        </FormControl.Label>
      </FormControl>
    </>
  );
};
export default TnCTooltipBtn;
