import {Pagination} from 'antd';

import {ResponsePagination} from './../../Types/api';

interface CustomPaginationProps {
  pagination?: ResponsePagination;
  onChange?: (page: number, size: number) => void;
}

const CustomPagination = ({pagination, onChange}: CustomPaginationProps) => {
  if (!pagination) return null;

  return (
    <Pagination
      style={{marginTop: 20}}
      size={'small'}
      showSizeChanger
      current={pagination.page}
      pageSize={pagination.page_size}
      onChange={onChange}
      total={pagination.total}
    />
  );
};

export default CustomPagination;
