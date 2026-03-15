import { Dropdown, type DropdownOption } from '@components/dropdown';
import { Typography } from '@components/ui/typography';
import { FORMATION_OPTIONS, FORMATIONS } from '@constants/tactics';
import type { FC } from 'react';

import styles from './tactics-controls.module.scss';

type TacticsControlsProps = {
  formationId: string;
  onFormationChangeAction: (id: string) => void;
};

export const TacticsControls: FC<TacticsControlsProps> = ({
  formationId,
  onFormationChangeAction,
}) => {
  const formationValue =
    formationId && formationId in FORMATIONS ? { key: formationId, value: formationId } : null;

  const handleFormationChangeAction = (opt: DropdownOption | null) => {
    onFormationChangeAction(opt?.key ?? '');
  };

  return (
    <div className={styles.controls}>
      <Typography tag="span" view="p-14" className={styles.label}>
        Формация
      </Typography>
      <Dropdown
        className={styles.formationDropdown}
        options={FORMATION_OPTIONS}
        value={formationValue}
        onChangeAction={handleFormationChangeAction}
        placeholder="Выберите формацию"
      />
    </div>
  );
};
