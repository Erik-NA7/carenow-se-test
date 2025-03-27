import {
    Menu,
    Portal,
} from "@chakra-ui/react";
import { Input } from "../ui/input";

interface MultipleSelectionProps {
    options: string[];
    name: string;
    value?: string[];
    onSelect?: (value: string[]) => void;
}

const MultipleSelection: React.FC<MultipleSelectionProps> = ({ options, name, value = [], onSelect }) => {
    const handleSelect = (option: string) => {
        const newValue = value.includes(option)
            ? value.filter((item) => item !== option)
            : [...value, option];
        onSelect?.(newValue);
    };

    const displayedItems = value.join(", ")
    
    return (
        <Menu.Root closeOnSelect={false} variant="solid" positioning={{ placement: "bottom" }}>
            <Menu.Trigger asChild>
                <Input
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
      
export default MultipleSelection;