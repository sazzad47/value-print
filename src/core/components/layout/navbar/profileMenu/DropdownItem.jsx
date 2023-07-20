import { Grid } from '@mui/material';

export default function DropdownItem(props) {
    return (
      <Grid className="menu_item_beta_drop cursor-pointer hover:bg-bgLightHover dark:hover:bg-bgDarkHover px-4" onClick={() => props.goToMenu && props.setActiveMenu(props.goToMenu)}>
        <span className={props.leftIcon? "text-textLight dark:text-textDark bg-[#dde2e7] dark:bg-[#6f7072] icon-button": props.doneIcon? "text-black dark:text-white icon-button bg-transparent" : "icon-button invisible" }>{props.doneIcon? props.doneIcon: props.leftIcon}</span>
        <span className='text-textLight dark:text-textDark text-[1rem]'>{props.children}</span>
        <span className="text-textLight dark:text-textDark icon-right">{props.rightIcon}</span>
      </Grid>
    );
  }