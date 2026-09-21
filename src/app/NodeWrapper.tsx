import type { ReactNode } from 'react';
import styles from './NodeWrapper.module.css';

type Props = {
  id: string;
  title: string;
  status?: string;
  children: ReactNode;
};

export function NodeWrapper({ id, title, status = 'Idle', children }: Props) {
  return (
    <div id={`node-${id}`} className={styles.nodeWrapper}>
      <header className={styles.nodeHeader}>
        <div className={styles.portLeft}></div>
        <div className={styles.nodeInfo}>
          <span className={styles.nodeId}>[{id}]</span>
          <span className={styles.nodeTitle}>{title}</span>
        </div>
        <div className={styles.nodeStatus}>
          Status: <span className={styles.statusBadge}>{status}</span>
        </div>
      </header>
      <div className={styles.nodeContent}>{children}</div>
    </div>
  );
}
