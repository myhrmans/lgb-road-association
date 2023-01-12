import { Toolbar, alpha, Typography, Tooltip, IconButton } from "@mui/material";
import { Data } from "../common/types/Types";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { UserAuth } from "../common/contexts/AuthContext";

interface EnhancedTableToolbarProps {
  numSelected: number;
  selected: readonly string[];
}

export function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, selected } = props;

  const { deleteFile } = UserAuth();

  const handleDelete = () => {
    selected.map((selectedRow) => {
      deleteFile(selectedRow);
    });

    // console.log(rows[numSelected]);
    // console.log(numSelected);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Filer
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={() => handleDelete()}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
