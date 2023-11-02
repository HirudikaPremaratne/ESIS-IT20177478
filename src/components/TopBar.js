import React, { useState } from "react";
import { AppBar, HStack, IconButton } from "@react-native-material/core";
import Icon, { IconType } from "react-native-dynamic-vector-icons";

import AddDialog from "./AddDialog";
import SignOutDialog from "./SignOutDialog";

const TopBar = ({ navigation }) => {
  const [addDialogVisible, setAddDialogVisible] = useState(false);
  const [signOutDialogVisible, setSignOutDialogVisible] = useState(false);

  const handleShowDialog = () => {
    setAddDialogVisible(true);
  };

  const handleCloseDialog = () => {
    setAddDialogVisible(false);
  };

  const handleShowSignOutDialog = () => {
    setSignOutDialogVisible(true);
  };

  const handleCloseSignOutDialog = () => {
    setSignOutDialogVisible(false);
  };

  return (
    <>
      <AppBar
        style={{ backgroundColor: "#3c6440" }}
        title="Taskify"
        leading={(props) => (
          <IconButton
            icon={(props) => (
              <Icon name="book" type={IconType.FontAwesome} {...props} />
            )}
            {...props}
          />
        )}
        trailing={(props) => (
          <HStack>
            <IconButton
              onPress={handleShowDialog}
              icon={(props) => (
                <Icon name="plus" type={IconType.FontAwesome5} {...props} />
              )}
              {...props}
            />
            <IconButton
              onPress={handleShowSignOutDialog}
              icon={(props) => (
                <Icon name="sign-out" type={IconType.FontAwesome} {...props} />
              )}
              {...props}
            />
          </HStack>
        )}
      />
      <AddDialog visible={addDialogVisible} onClose={handleCloseDialog} />
      <SignOutDialog
        visible={signOutDialogVisible}
        onClose={handleCloseSignOutDialog}
      />
    </>
  );
};

export default TopBar;
