import { InputLabel, FormControl, MenuItem, Select } from "@mui/material";

const Dropdown = ({
    menuItems,
    selected,
    setSelected,
    isLoading,
    background,
    width,
    label,
}) => {
    /**
     * Handle dropdown value selection change.
     * @param {*} event
     */
    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    return (
        <FormControl
            fullWidth={width ? false : true}
            size={width !== undefined ? "small" : "medium"}
            sx={{ alignSelf: "center" }}
        >
            <InputLabel id="dropdown-selector-label">{label}</InputLabel>
            <Select
                labelId="dropdown-selector-label"
                id="dropdown-selector"
                data-testid="dropdown-selector"
                label={label}
                value={selected}
                onChange={handleChange}
                disabled={isLoading}
                variant="outlined"
                sx={{ bgcolor: background ? background : "", width: width }}
            >
                {menuItems.map((menuItem, index) => (
                    <MenuItem key={`${menuItem}-${index}`} value={menuItem}>
                        {menuItem}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default Dropdown;
