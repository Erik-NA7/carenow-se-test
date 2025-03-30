import {
    Button,
    Menu,
    Portal,
} from "@chakra-ui/react";
import { Input } from "./input";

// Reusable closed Form Field Component for Multiple selection (checkboxes)

interface MultipleSelectionProps {
    options: string[];
    name: string;
    value: string[];
    onChange: (value: string[]) => void;
}

export const MultipleSelection: React.FC<MultipleSelectionProps> = ({
    options,
    name,
    value,
    onChange,
}) => {
    
    // Handle check/uncheck
    const handleSelect = (option: string) => {
        const newValue = value.includes(option)
            ? value.filter((item) => item !== option)
            : [...value, option];
        onChange(newValue);
    };

    // Handle how the array of selected values is displayed
    const displayedItems = value.join(", ")
    
    return (
        <Menu.Root closeOnSelect={false} variant="solid" positioning={{ placement: "bottom" }}>
            <Menu.Trigger asChild maxWidth={200}>
                <Button
                    display="block"
                    borderColor="gray.300"
                    background="transparent"
                    color="inherit"
                    focusRing="inside"
                    focusRingColor="brand.300"
                    focusRingOffset="1"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    width="full"
                    textAlign="start"
                    css={{ padding: "0 12px" }}
                    title={`${name}-trigger`}
                >
                    {displayedItems}
                </Button>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content width={200}>
                        { options.map((option) => (
                            <Menu.CheckboxItem
                                value={option}
                                key={option}
                                checked={value.includes(option)}
                                onCheckedChange={() => handleSelect(option)}
                            >
                                {option}
                                <Menu.ItemIndicator
                                    borderColor="gray.800"
                                />
                            </Menu.CheckboxItem>
                        ))}
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    );
};
      