import React from 'react';
import Container from 'src/components/Container';
import GlobalContext from 'src/context';
import {
  Text, IconButton, TouchableRipple, Avatar
} from 'react-native-paper';
import { useStateLink, useStateLinkUnmounted } from '@hookstate/core';
import UserProfile from 'img/avatar.png';
import { colors } from 'src/theme';
import { StyleSheet } from 'react-native';

const Profile = () => {
  const authState = useStateLinkUnmounted(GlobalContext.auth.authStateRef);
  return (
    <Container
      horizontal
      vertical
      style={{
        backgroundColor: '#C9C9C9',
        alignItems: 'center'
      }}
    >
      <Avatar.Image
        source={UserProfile}
        size={150}
      />
      <Text style={styles.userNameText}>
        {authState.value.user?.nickname}
      </Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  userNameText: {
    marginVertical: 6
  }
});

export default Profile;