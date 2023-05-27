import React, { useCallback, useRef, useState } from 'react';
import {
  DataGrid,
  GridColumns,
  GridRowModel,
  GridRowsProp,
} from '@mui/x-data-grid';
import {
  UpdateMfvrDocument,
  UpdateToArchiveVesselDocument,
  VesselQueryDocument,
  ArchiveVesselDocument,
  UpdateToArchiveGearDocument,
  ArchiveGearDocument,
} from '../../graphql/generated';
import { useMutation, useQuery, ApolloError } from '@apollo/client';
import Loading from '../Loading/Loading';
import {
  Alert,
  AlertProps,
  Backdrop,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  Snackbar,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import moment from 'moment';
import {
  showArchiveError,
  showArchiveSuccess,
} from '../ConfirmationDialog/Alerts';
import UpdateVesselForm from '../Forms/UpdateVesselForm';
import { VesselQueryQuery } from '../../graphql/generated';

interface Props {
  error: ApolloError | undefined;
  loading: boolean;
  data: VesselQueryQuery | undefined;
}

const renderMoreActions = (id: number) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [updateVessel, setUpdateVessel] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const handleUpdateFormOpen = () => setUpdateVessel(true);

  const handleUpdateFormClose = () => {
    setUpdateVessel(false);
    handleClose();
  };

  const [archiveVessel, archiveResult] = useMutation(
    UpdateToArchiveVesselDocument,
    {
      refetchQueries: [
        {
          query: VesselQueryDocument,
        },
        {
          query: ArchiveGearDocument,
        },
      ],
    }
  );

  const ArchiveAVessel = () => {
    archiveVessel({
      variables: {
        archiveVesselId: id,
      },
      onCompleted: () => {
        showArchiveSuccess();
      },
      onError: () => {
        showArchiveError();
      },
    });
  };

  const archiveHandler = () => {
    const { loading } = archiveResult;
    if (loading) {
      return (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        ></Backdrop>
      );
    }
  };

  return (
    <div>
      <Button
        id="vessel-action-btn"
        aria-controls={open ? 'vessel-action-btn' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        aria-label="vessel-action-btn"
        disableElevation
        onClick={handleClick}
        style={{ color: '#808080' }}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="vessel-action-menu"
        MenuListProps={{
          'aria-labelledby': 'vessel-action-menu-list',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleUpdateFormOpen} disableRipple>
          <EditIcon sx={{ width: 20, marginRight: 1.5 }} /> Edit
        </MenuItem>
        {updateVessel && (
          <UpdateVesselForm
            id={id}
            handleClose={handleUpdateFormClose}
            open={updateVessel}
          />
        )}
        <MenuItem
          onClick={() => {
            ArchiveAVessel();
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

const computeMutation = (newRow: GridRowModel, oldRow: GridRowModel) => {
  if (newRow.mfvrNum !== oldRow.mfvrNum) {
    return `MFVR number from ${oldRow.mfvrNum} to ${newRow.mfvrNum}`;
  }
  return null;
};

export default function FisherfolkVesselTable({ error, loading, data }: Props) {
  const [updateMfvr] = useMutation(UpdateMfvrDocument, {
    refetchQueries: [
      {
        query: VesselQueryDocument,
      },
    ],
  });

  const noButtonRef = useRef<HTMLButtonElement>(null);
  const [promiseArguments, setPromiseArguments] = useState<any>(null);

  const [snackbar, setSnackbar] = React.useState<Pick<
    AlertProps,
    'children' | 'severity'
  > | null>(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleEntered = () => {
    return 0;
  };

  const handleNo = () => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow); // Resolve with the old row to not update the internal state
    setPromiseArguments(null);
  };

  const handleYes = async () => {
    const { newRow, oldRow, reject, resolve } = promiseArguments;

    try {
      const response = await updateMfvr({
        variables: {
          id: newRow['id'],
          mfvrNum: newRow['mfvrNum'],
        },
      });
      setSnackbar({
        children: 'Successfully changed MFVR number.',
        severity: 'success',
      });
      resolve(response);
      setPromiseArguments(null);
    } catch (error) {
      setSnackbar({ children: 'Name can not be empty', severity: 'error' });
      reject(oldRow);
      setPromiseArguments(null);
    }
  };

  const processRowUpdate = useCallback(
    (newRow: GridRowModel, oldRow: GridRowModel) =>
      new Promise<GridRowModel>((resolve, reject) => {
        const mutation = computeMutation(newRow, oldRow);
        if (mutation) {
          // Save the arguments to resolve or reject the promise later
          setPromiseArguments({ resolve, reject, newRow, oldRow });
        } else {
          resolve(oldRow); // Nothing was changed
        }
      }),
    []
  );

  const renderConfirmDialog = () => {
    if (!promiseArguments) {
      return null;
    }

    const { newRow, oldRow } = promiseArguments;
    const mutation = computeMutation(newRow, oldRow);

    return (
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleEntered }}
        open={!!promiseArguments}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent
          dividers
        >{`Pressing YES will change ${mutation}.`}</DialogContent>
        <DialogActions>
          <Button ref={noButtonRef} onClick={handleNo}>
            No
          </Button>
          <Button onClick={handleYes}>Yes</Button>
        </DialogActions>
      </Dialog>
    );
  };

  let rows: GridRowsProp = [];

  if (error) {
    return <Alert severity="error">Something went wrong.</Alert>;
  }

  if (loading) {
    return <Loading />;
  }

  if (!loading && data !== undefined) {
    rows =
      data &&
      data.vessels.map((vessel) => ({
        id: vessel.id,
        dateRegistered: new Date(vessel.createdAt),
        mfvrNum: vessel.mfvrNumber,
        name: vessel.name,
        operator: `${vessel.fisherfolk.lastName}, ${vessel.fisherfolk.firstName} ${vessel.fisherfolk.middleName} ${vessel.fisherfolk.appellation}`,
        status: '',
      }));
  }

  return (
    <div style={{ height: '85vh', width: '100%' }}>
      {renderConfirmDialog()}
      <DataGrid
        rows={rows}
        columns={columns}
        experimentalFeatures={{ newEditingApi: true }}
        disableVirtualization={true}
        processRowUpdate={processRowUpdate}
        aria-label="vessel-table"
      />
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </div>
  );
}

const columns: GridColumns = [
  { field: 'id', headerName: 'ID', disableColumnMenu: true },
  {
    field: 'dateRegistered',
    headerName: 'Date Registered',
    type: 'date',
    minWidth: 150,
    disableColumnMenu: true,
    valueFormatter: (params) => moment(params?.value).format('MM/DD/YYYY'),
  },
  {
    field: 'mfvrNum',
    headerName: 'MFVR Number',
    editable: true,
    disableColumnMenu: true,
    minWidth: 170,
  },
  {
    field: 'name',
    headerName: 'Name',
    disableColumnMenu: true,
    minWidth: 170,
  },
  {
    field: 'operator',
    headerName: 'Operator',
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
    valueGetter(params) {
      return params.row.id;
    },
    renderCell(params) {
      return renderMoreActions(params.row.id);
    },
  },
];
