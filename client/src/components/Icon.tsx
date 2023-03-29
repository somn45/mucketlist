import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProps } from '../types/atomTypes/atom';

function Icon({ icon }: IconProps) {
  return <FontAwesomeIcon icon={icon}></FontAwesomeIcon>;
}

export default Icon;
