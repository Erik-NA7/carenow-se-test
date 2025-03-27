import {
    Menu,
    For,
    Portal,
    Box,
    Stack
} from "@chakra-ui/react";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";

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
        <Menu.Root closeOnSelect={false} variant="solid">
            <Menu.Trigger asChild>
                <Input
                    value={displayedItems}
                    type="text"
                    readOnly
                />
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Stack
                        gap={2}
                        width={250}
                        colorScheme="light"
                        bg="white"
                    >
                        {/* <For each={options}>
                            {(option) => (
                                <Menu.CheckboxItem
                                    value={option}
                                    key={option}
                                    checked={value.includes(option)}
                                    onCheckedChange={() => handleSelect(option)}
                                >
                                    {option}
                                    <Menu.ItemIndicator
                                        borderColor="gray.800"
                                        hidden={false}
                                        asChild
                                    />
                                </Menu.CheckboxItem>
                            )}  
                        </For> */}
                        { options.map((option) => (
                            <Checkbox
                                key={option}
                                checked={value.includes(option)}
                                onChange={() => handleSelect(option)}
                                colorScheme="light"
                            >
                                {option}
                            </Checkbox>
                        ))}
                    </Stack>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    );
    };
      
export default MultipleSelection;