import React, {FC} from 'react';
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {useBusiness} from 'store/business/hooks';
import {Button} from 'components/Button';
import {StatusModal} from 'components/StatusModal';
import Upload from 'components/svg/Upload';
import {layout, spacing} from 'core/styles';
import styles from './Documents.styles';

const Documents: FC<NativeStackScreenProps<AppStackNavParams, 'Documents'>> = ({
  navigation,
}) => {
  const {loading, error, setError} = useBusiness();

  // const onSubmit = async values => {
  //   const res = await updateBusiness(values);

  //   if (res && !res.error) navigation.navigate('Address');
  // };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView
        style={layout.flex1}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        behavior="padding">
        <ScrollView
          style={styles.innerContainer}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="always">
          <View style={layout.flex1}>
            <Text style={styles.semiheader28}>Upload company documents</Text>

            <Text style={[styles.text16, spacing.marginTop4]}>
              To ensure the authenticity and credibility of your garage, please
              upload the necessary business documents, such as licenses,
              certifications, and insurance.
            </Text>

            <View style={spacing.marginTop24}>
              <View style={spacing.marginBottom16}>
                <Text style={styles.semiheader17}>Document 1</Text>

                <TouchableOpacity
                  style={[styles.dottedContainer, spacing.marginTop4]}>
                  <View style={styles.circle}>
                    <Upload />
                  </View>

                  <Text
                    style={[
                      styles.text13,
                      spacing.marginTop12,
                      spacing.marginBottom4,
                    ]}>
                    Click to Upload
                  </Text>

                  <Text style={styles.text12}>(Max. File size: 25 MB)</Text>
                </TouchableOpacity>
              </View>

              <View>
                <Text style={styles.semiheader17}>Document 2</Text>

                <TouchableOpacity
                  style={[styles.dottedContainer, spacing.marginTop4]}>
                  <View style={styles.circle}>
                    <Upload />
                  </View>

                  <Text
                    style={[
                      styles.text13,
                      spacing.marginTop12,
                      spacing.marginBottom4,
                    ]}>
                    Click to Upload
                  </Text>

                  <Text style={styles.text12}>(Max. File size: 25 MB)</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Button
            title="Continue"
            // onPress={() => handleSubmit()}
            style={spacing.marginTop24}
            loading={loading}
            // disabled={values.description === '' ? true : loading}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <StatusModal
        open={!!error}
        onClose={() => setError(false)}
        message={
          typeof error === 'string' ? error : 'Oops, something went wrong!'
        }
        status="error"
      />
    </SafeAreaView>
  );
};

export default Documents;
