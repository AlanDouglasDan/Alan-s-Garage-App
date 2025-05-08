import React, {FC} from 'react';
import {Text, SafeAreaView, View, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {spacing, common} from 'core/styles';
import styles from './Privacy.styles';

const Privacy: FC<
  NativeStackScreenProps<AppStackNavParams, 'Privacy'>
> = ({}) => {
  const unorderedList = (data, solid = true) => (
    <View style={[common.flexedRow, common.alignStart, spacing.marginBottom4]}>
      <View
        style={[styles.dot, solid ? styles.solidDot : styles.transparentDot]}
      />
      <Text style={styles.text16}>{data}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        style={styles.innerContainer}
        contentContainerStyle={styles.contentContainer}>
        <Text style={styles.semiheader28}>Privacy Policy</Text>

        <View>
          <View style={spacing.marginTop12}>
            <Text style={styles.text16}>
              This Privacy Policy governs the manner in which Aucarga collects,
              uses, maintains, and discloses information collected from users
              (each, a "User") of the Aucarga mobile application ("App").
            </Text>
          </View>

          <View style={spacing.marginTop16}>
            <Text style={styles.text16}>
              Aucarga ("us", "we", or "our") operates the Aucarga mobile
              application (the "App").
            </Text>
          </View>

          <View style={spacing.marginTop16}>
            <Text style={styles.text16}>
              This page informs you of our policies regarding the collection,
              use, and disclosure of personal data when you use our App and the
              choices you have associated with that data.
            </Text>
          </View>

          <View style={spacing.marginTop16}>
            <Text style={styles.text16}>
              We use your data to provide and improve the App. By using the App,
              you agree to the collection and use of information in accordance
              with this policy.
            </Text>
          </View>

          <View style={spacing.marginTop16}>
            <Text style={styles.semiheader16}>
              Information Collection and Use
            </Text>

            <View style={spacing.marginTop8}>
              <Text style={styles.text16}>
                We collect several different types of information for various
                purposes to provide and improve our App to you.
              </Text>
            </View>
          </View>

          <View style={spacing.marginTop16}>
            <Text style={styles.semiheader16}>Types of Data Collected</Text>

            <View style={[spacing.marginTop8, styles.indent]}>
              <View>
                {unorderedList(
                  'Personal Data: While using our App, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:',
                )}
                <View style={styles.indent}>
                  {unorderedList('Email address', false)}
                  {unorderedList('First name and last name', false)}
                  {unorderedList('Phone number', false)}
                  {unorderedList(
                    'Address, State, Province, ZIP/Postal code, City',
                    false,
                  )}
                  {unorderedList('Cookies and Usage Data', false)}
                </View>
              </View>

              {unorderedList(
                'Usage Data: We may also collect information on how the App is accessed and used ("Usage Data"). This Usage Data may include information such as your device\'s Internet Protocol address (e.g., IP address), browser type, browser version.',
              )}
              {unorderedList('Address (geolocation data)')}
              {unorderedList(
                'Device information (such as device type, operating system version, and unique device identifiers)',
              )}
              {unorderedList(
                'Usage statistics about your interactions with the App',
              )}
            </View>
          </View>

          <View style={spacing.marginTop16}>
            <Text style={styles.semiheader16}>Tracking & Cookies Data</Text>

            <Text style={[styles.text16, spacing.marginTop8]}>
              We use cookies and similar tracking technologies to track the
              activity on our App and hold certain information.
            </Text>
          </View>

          <View style={spacing.marginTop16}>
            <Text style={styles.semiheader16}>Examples of Cookies We Use:</Text>

            <View style={[spacing.marginTop8, styles.indent]}>
              {unorderedList(
                'Session Cookies: We use Session Cookies to operate our App.',
              )}
              {unorderedList(
                'Preference Cookies: We use Preference Cookies to remember your preferences and various settings.',
              )}
              {unorderedList(
                'Security Cookies: We use Security Cookies for security purposes.',
              )}
            </View>
          </View>

          <View style={spacing.marginTop16}>
            <Text style={styles.text16}>
              You can instruct your browser to refuse all cookies or to indicate
              when a cookie is being sent. However, if you do not accept
              cookies, you may not be able to use some portions of our App.
            </Text>
          </View>

          <View style={spacing.marginTop16}>
            <Text style={styles.semiheader16}>Usage of Data</Text>

            <View style={spacing.marginTop8}>
              <Text style={styles.text16}>
                Aucarga uses the collected data for various purposes:
              </Text>
            </View>

            <View style={[spacing.marginTop8, styles.indent]}>
              {unorderedList('To provide and maintain our App')}
              {unorderedList('To notify you about changes to our App')}
              {unorderedList(
                'To allow you to participate in interactive features of our App when you choose to do so',
              )}
              {unorderedList('To provide customer support')}
              {unorderedList(
                'To gather analysis or valuable information so that we can improve our App',
              )}
              {unorderedList('To monitor the usage of our App')}
              {unorderedList(
                'To detect, prevent, and address technical issues',
              )}
            </View>
          </View>

          <View style={spacing.marginTop16}>
            <Text style={styles.semiheader16}>Disclosure of Data</Text>

            <View style={spacing.marginTop8}>
              <Text style={styles.text16}>
                We do not share your Personal Data with third parties except as
                described in this Privacy Policy. We may disclose aggregated,
                anonymized information about our users that does not identify
                any individual without restriction.
              </Text>
            </View>
          </View>

          <View style={spacing.marginTop16}>
            <Text style={styles.semiheader16}>Legal Requirements</Text>

            <View style={spacing.marginTop8}>
              <Text style={styles.text16}>
                Aucarga may disclose your Personal Data in the good faith belief
                that such action is necessary to:
              </Text>
            </View>

            <View style={[spacing.marginTop8, styles.indent]}>
              {unorderedList('Comply with a legal obligation')}
              {unorderedList(
                'Protect and defend the rights or property of Aucarga',
              )}
              {unorderedList(
                'Prevent or investigate possible wrongdoing in connection with the App',
              )}
              {unorderedList(
                'Protect the personal safety of users of the App or the public',
              )}
              {unorderedList('Protect against legal liability')}
            </View>
          </View>

          <View style={spacing.marginTop16}>
            <Text style={styles.semiheader16}>Security of Data</Text>

            <View style={spacing.marginTop8}>
              <Text style={styles.text16}>
                The security of your data is important to us, but remember that
                no method of transmission over the Internet. The security of
                your data is important to us, but remember that no method of
                transmission over the internet can guarantee absolute security.
                While we strive to use commercially acceptable means to protect
                your Personal Data, we cannot guarantee its absolute security.
              </Text>
            </View>
          </View>

          <View style={spacing.marginTop16}>
            <Text style={styles.semiheader16}>Your Rights</Text>

            <View style={spacing.marginTop8}>
              <Text style={styles.text16}>
                You have certain rights regarding your Personal Data, including
                the right to access, update, or delete the information we have
                about you. If you wish to exercise these rights, please contact
                us.
              </Text>
            </View>
          </View>

          <View style={spacing.marginTop16}>
            <Text style={styles.semiheader16}>Children's Privacy</Text>

            <View style={spacing.marginTop8}>
              <Text style={styles.text16}>
                Our App does not address anyone under the age of 13
                ("Children"). We do not knowingly collect personally
                identifiable information from anyone under the age of 13. If you
                are a parent or guardian and you are aware that your Children
                have provided personal data to us, please contact us.
              </Text>
            </View>

            <View style={spacing.marginTop8}>
              <Text style={styles.text16}>
                If we become aware that we have collected Personal Data from
                children without verification of parental consent, we take steps
                to remove that information from our servers.
              </Text>
            </View>
          </View>

          <View style={spacing.marginTop16}>
            <Text style={styles.semiheader16}>
              Changes to This Privacy Policy
            </Text>

            <View style={spacing.marginTop8}>
              <Text style={styles.text16}>
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page.
              </Text>
            </View>

            <View style={spacing.marginTop8}>
              <Text style={styles.text16}>
                You are advised to review this Privacy Policy periodically for
                any changes. Changes to this Privacy Policy are effective when
                they are posted on this page.
              </Text>
            </View>
          </View>

          <View style={spacing.marginTop16}>
            <Text style={styles.semiheader16}>Contact Us</Text>

            <View style={spacing.marginTop8}>
              <Text style={styles.text16}>
                If you have any questions about this Privacy Policy, please
                contact us.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Privacy;
