import React from 'react';
import { Modal, Pressable, ScrollView, Text } from 'react-native';

type MenuModalProps = {
    visible: boolean;
    onClose: () => void;
    categories: { id: string; title: string; count: number }[];
};

export const MenuModal = ({ visible, onClose, categories }: MenuModalProps) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            {/* Backdrop */}
            <Pressable
                className="flex-1 justify-end"
                onPress={onClose}
            >
                {/* Menu Card */}
                <Pressable
                    className="bg-foreground w-64 absolute bottom-8 right-5 rounded-3xl shadow-xl border border-border p-4"
                    onPress={(e) => e.stopPropagation()} // Prevent touches from closing the modal
                >

                    <ScrollView showsVerticalScrollIndicator={false} className="max-h-64">
                        {categories.map((cat, index) => (
                            <Pressable
                                key={cat.id}
                                className={"flex-row justify-between items-center py-2 mb-0.5"}
                                onPress={() => {
                                    // In the future, this should scroll to the relevant section
                                    onClose();
                                }}
                            >
                                <Text className="font-sans-semibold text-md text-white">
                                    {cat.title}
                                </Text>
                                <Text className="font-sans-bold text-md text-white">
                                    {cat.count}
                                </Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </Pressable>
            </Pressable>
        </Modal>
    );
};
