import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProps } from '../utils/types/atomTypes';

function Icon({ icon }: IconProps) {
  return <FontAwesomeIcon icon={icon}></FontAwesomeIcon>;
}

export default Icon;
