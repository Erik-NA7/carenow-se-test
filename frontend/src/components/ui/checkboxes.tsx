import {
    Menu,
    Portal,
} from "@chakra-ui/react";
import { Input } from "./input";

// Reusable closed Form Field Component for Multiple selection (checkboxes)

interface MultipleSelectionProps {
    options: string[];
    id: string;
    name: string;
    value: string[];
    onSelect: (value: string[]) => void;
}

export const MultipleSelection: React.FC<MultipleSelectionProps> = ({
    options,
    id,
    name,
    value,
    onSelect,
}) => {
    
    // Handle check/uncheck
    const handleSelect = (option: string) => {
        const newValue = value.includes(option)
            ? value.filter((item) => item !== option)
            : [...value, option];
        onSelect?.(newValue);
    };

    // Handle how the array of selected values is displayed
    const displayedItems = value.join(", ")
    
    return (
        <Menu.Root closeOnSelect={false} variant="solid" positioning={{ placement: "bottom" }}>
            <Menu.Trigger asChild>
                <Input
                    id={id}
                    name={name}
                    value={displayedItems}
                    type="text"
                    readOnly
                />
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content width={230}>
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
      