import { Button, Menu, MenuItem, Alert, Backdrop, Stack } from '@mui/material';
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ArchiveGearDocument, FisherfolkGearsDocument, UpdateToArchiveGearDocument, GearsQueryDocument, RemoveFisherfolkGearDocument } from '../../graphql/generated';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { splitUpperCase } from '../../utils/utils';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RemoveIcon from '@mui/icons-material/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';
import moment from 'moment';
import { DataGrid, GridColumns, GridRowsProp } from '@mui/x-data-grid';
import { showArchiveError, showArchiveSuccess, showRemoveSuccess, showRemoveError } from '../ConfirmationDialog/Alerts';
import CustomizedDialogs from '../ConfirmationDialog/ConfirmationDialog';

const RenderMoreActions = (id: number, fisherfolkId: number) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openRemoveGear, setOpenRemoveGear] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const handleGearRemoveOpen = () => setOpenRemoveGear(true);

  const handleGearRemoveClose = () => setOpenRemoveGear(false);

  const [archiveGear, archiveResult] = useMutation(UpdateToArchiveGearDocument, {
    refetchQueries: [
      {
        query: ArchiveGearDocument,
      },
      {
        query: GearsQueryDocument,
      },
    ],
  });

  const [removeGear, { data, loading, error }] = useMutation(RemoveFisherfolkGearDocument, {
    refetchQueries: [
      {
        query: ArchiveGearDocument,
      },
      {
        query: GearsQueryDocument,
      },
      {
        query: FisherfolkGearsDocument,
        variables: { fisherfolkId: fisherfolkId },
      },
    ],
  });

  const deleteGear = () => {
    removeGear({
      variables: {
        gearId: id,
      },
      onCompleted: () => {
        showRemoveSuccess();
        handleGearRemoveClose();
      },
      onError: () => {
        showRemoveError();
      },
    });
  };

  const ArchiveAGear = () => {
    archiveGear({
      variables: {
        archiveGearId: id,
      },
      onCompleted: () => {
        showArchiveSuccess();
        handleClose();
      },
      onError: () => {
        showArchiveError();
      },
    });
  };

  const archiveHandler = () => {
    const { loading } = archiveResult;
    if (loading) {
      return <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}></Backdrop>;
    }
  };

  const removeHandler = () => {
    if (loading) {
      return <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}></Backdrop>;
    }
  };

  return (
    <div>
      <Button id="action-btn" aria-controls={open ? 'gear-action-btn' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} aria-label="gear-action-btn" disableElevation onClick={handleClick} style={{ color: '#808080' }}>
        <MoreVertIcon />
      </Button>
      <Menu
        id="gear-action-menu"
        MenuListProps={{
          'aria-labelledby': 'gear-action-menu-list',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleGearRemoveOpen();
            removeHandler();
          }}
          disableRipple
        >
          <RemoveIcon sx={{ width: 20, marginRight: 1.5 }} /> Remove
        </MenuItem>
        <CustomizedDialogs open={openRemoveGear} handleClose={handleGearRemoveClose} handleLogout={() => deleteGear()} title="Remove Gear" message="Are you sure you want to remove this gear?" leftBtnMsg="No" rightBtnMsg="Yes" />
        <MenuItem
          onClick={() => {
            ArchiveAGear();
            archiveHandler();
          }}
          disableRipple
        >
          <ArchiveIcon sx={{ width: 20, marginRight: 1.5 }} /> Archive
        </MenuItem>
      </Menu>
    </div>
  );
};

// const  renderCell = () => <RenderMoreActions />;

export default function GearTable() {
  const { id } = useParams();

  const { error, loading, data } = useQuery(FisherfolkGearsDocument, {
    variables: {
      fisherfolkId: id,
    },
  });

  let rows: GridRowsProp = [];

  if (error) {
    return <Alert severity="error">Something went wrong.</Alert>;
  }

  if (loading) {
    return <Loading />;
  }

  if (!loading && data != undefined) {
    rows =
      data &&
      data.fisherfolkGears.map((gear) => ({
        id: gear.id,
        fisherfolkId: id,
        dateRegistered: new Date(gear.createdAt),
        classification: splitUpperCase(gear.classification),
        type: splitUpperCase(gear.type),
      }));
  }

  return (
    <div style={{ height: '85vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        aria-label="fisherfolk-gear-table"
        disableVirtualization={true}
        components={{
          NoRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              No results found.
            </Stack>
          ),
        }}
      />
    </div>
  );
}

const columns: GridColumns = [
  { field: 'id', headerName: 'ID', disableColumnMenu: true },
  {
    field: 'dateRegistered',
    headerName: 'Date Registered',
    type: 'date',
    disableColumnMenu: true,
    minWidth: 150,
    valueFormatter: (params) => moment(params?.value).format('MM/DD/YYYY'),
  },
  {
    field: 'classification',
    headerName: 'Classification',
    disableColumnMenu: true,
    minWidth: 150,
  },
  {
    field: 'type',
    headerName: 'Type',
    disableColumnMenu: true,
    minWidth: 250,
  },
  {
    field: 'status',
    headerName: 'Status',
    disableColumnMenu: true,
    minWidth: 130,
  },
  {
    field: 'actions',
    headerName: '',
    disableColumnMenu: true,
    sortable: false,
    renderCell(params) {
      return RenderMoreActions(params.row.id, params.row.fisherfolkId);
    },
  },
];
