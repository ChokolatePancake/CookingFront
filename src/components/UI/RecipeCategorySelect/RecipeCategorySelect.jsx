import React from 'react';
import {Box, Chip, MenuItem, OutlinedInput, Select, useTheme} from "@mui/material";

const RecipeCategorySelect = ({onChange, defaultValue}) => {
    const theme = useTheme();
    const categories = [
        'Soup',
        'Salad',
        'Sandwich',
        'Meat',
        'Fish',
        'Pasta',
        'Rice',
        'Japanese',
        'Italian',
        'Mexican',
        'Breakfast',
        'Brunch',
        'Lunch',
        'Dinner',
        'Supper',
        'Snack',
        'Vegeterian'
    ];
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    function getStyles(name, category, theme) {
        return {
            fontWeight:
                category.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }
    return (
        <div>
            <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={defaultValue}
                onChange={onChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {categories.map((category) => (
                    <MenuItem
                        key={category}
                        value={category}
                        style={getStyles(category, defaultValue, theme)}
                    >
                        {category}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
};

export default RecipeCategorySelect;