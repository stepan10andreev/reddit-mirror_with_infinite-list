import React, { FC } from 'react';
import styles from './Title.module.scss';
import Link from 'next/link';

interface Props {
  title: string;
  permalink: string;
  id: string;
}

export const Title: FC<Props> = ({title, permalink, id}) => {
  return (
    <h2 className={styles.title} >
          <Link
            href={`/?post=${id}`}
            as={`/post/${id}`}
            className={styles.postLink}
          >
            {title}
          </Link>
    </h2>
  );
}


