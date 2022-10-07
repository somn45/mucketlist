import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface iconProps {
  icon: IconDefinition;
}

function Icon({ icon }: iconProps) {
  return <FontAwesomeIcon icon={icon} />;
}

export default Icon;
