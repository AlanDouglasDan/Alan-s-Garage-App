import React, {FC} from 'react';
import {Text, SafeAreaView, View, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {spacing, common} from 'core/styles';
import styles from './Terms.styles';

const Terms: FC<NativeStackScreenProps<AppStackNavParams, 'Terms'>> = ({}) => {
  const unorderedList = data => (
    <View style={[common.flexedRow, common.alignStart, spacing.marginBottom4]}>
      <View style={styles.dot} />
      <Text style={styles.text16}>{data}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        style={styles.innerContainer}
        contentContainerStyle={styles.contentContainer}>
        <Text style={styles.semiheader28}>Terms and Conditions</Text>

        <View>
          <View style={spacing.marginTop12}>
            <Text style={styles.semiheader16}>1. Introduction</Text>

            <View style={spacing.marginTop8}>
              <Text style={styles.text16}>
                These terms and conditions govern your use of Aucarga's website
                and services. By accessing this website, you acknowledge and
                agree to be bound by these terms and conditions. If you do not
                agree to these terms and conditions, you must not use the
                website or services.
              </Text>
            </View>
          </View>

          <View style={spacing.marginTop16}>
            <Text style={styles.semiheader16}>2. Definitions</Text>

            <View style={[spacing.marginTop8, styles.indent]}>
              {unorderedList('"Company" refers to Aucarga.')}
              {unorderedList('"Website" refers to Aucarga\'s website.')}
              {unorderedList(
                '"Services" refers to the services provided by Aucarga.',
              )}
              {unorderedList(
                '"User" refers to anyone who uses the website or services.',
              )}
            </View>
          </View>

          <View style={spacing.marginTop16}>
            <Text style={styles.semiheader16}>3. Acceptance of Terms</Text>

            <View style={spacing.marginTop8}>
              <Text style={styles.text16}>
                By accessing or using the website or services, you agree to be
                bound by these terms and conditions, as well as any additional
                terms and policies referenced herein. These terms and conditions
                apply to all users of the website and services, including
                without limitation users who are browsers, vendors, customers,
                merchants, and/or contributors of content.
              </Text>
            </View>
          </View>

          <View style={spacing.marginTop16}>
            <Text style={styles.semiheader16}>4. User Accounts</Text>

            <View style={[spacing.marginTop8, styles.indent]}>
              {unorderedList(
                'You must register for an account to access certain features of the website or services.',
              )}
              {unorderedList(
                'You are responsible for maintaining the security and confidentiality of your account credentials.',
              )}
              {unorderedList(
                'You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.',
              )}
            </View>
          </View>

          <View style={spacing.marginTop16}>
            <Text style={styles.semiheader16}>5. User Conduct</Text>

            <Text
              style={[
                styles.text16,
                spacing.marginTop8,
                spacing.marginBottom10,
              ]}>
              You agree not to use the website or services for any unlawful or
              prohibited purpose, or to engage in any activity that interferes
              with or disrupts the website or services. Prohibited activities
              include, but are not limited to:
            </Text>

            <View style={[styles.indent]}>
              {unorderedList(
                'Violating any applicable laws, regulations, or third-party rights.',
              )}
              {unorderedList(
                'Interfering with or disrupting the integrity or performance of the website or services.',
              )}
              {unorderedList(
                'Uploading or transmitting any viruses, worms, or other malicious code.',
              )}
            </View>
          </View>

          <View style={spacing.marginTop16}>
            <Text style={styles.semiheader16}>
              6. Intellectual Property Rights
            </Text>

            <View style={spacing.marginTop8}>
              <Text style={styles.text16}>
                All content and materials available on the website or services,
                including but not limited to text, graphics, logos, button
                icons, images, audio clips, digital downloads, data
                compilations, and software, are the property of Aucarga or its
                licensors and are protected by copyright, trademark, and other
                intellectual property laws.
              </Text>
            </View>
          </View>

          <View style={spacing.marginTop16}>
            <Text style={styles.semiheader16}>7. Disclaimer of Warranties</Text>

            <View style={spacing.marginTop8}>
              <Text style={styles.text16}>
                The website and services are provided on an "as is" and "as
                available" basis, without any representations or warranties of
                any kind, express or implied. Aucarga does not warrant that the
                website or services will be error-free, uninterrupted, secure,
                or free from viruses or other harmful components.
              </Text>
            </View>
          </View>

          <View style={spacing.marginTop16}>
            <Text style={styles.semiheader16}>8. Limitation of Liability</Text>

            <View style={spacing.marginTop8}>
              <Text style={styles.text16}>
                To the fullest extent permitted by applicable law, Aucarga shall
                not be liable for any indirect, incidental, special,
                consequential, or punitive damages, including but not limited to
                loss of profits, data, use, or goodwill, arising out of or in
                connection with the use or performance of the website or
                services.
              </Text>
            </View>
          </View>

          <View style={spacing.marginTop16}>
            <Text style={styles.semiheader16}>9. Indemnification</Text>

            <View style={spacing.marginTop8}>
              <Text style={styles.text16}>
                You agree to indemnify, defend, and hold harmless Aucarga and
                its affiliates, officers, directors, employees, agents,
                licensors, and suppliers from and against all claims,
                liabilities, damages, losses, costs, expenses, or fees
                (including reasonable attorneys' fees) arising out of or related
                to your use or misuse of the website or services.
              </Text>
            </View>
          </View>

          <View style={spacing.marginTop16}>
            <Text style={styles.semiheader16}>
              10. Governing Law and Jurisdiction
            </Text>

            <View style={spacing.marginTop8}>
              <Text style={styles.text16}>
                These terms and conditions shall be governed by and construed in
                accordance with the laws of EU, without regard to its conflict
                of law principles. Any dispute arising out of or in connection
                with these terms and conditions shall be subject to the
                exclusive jurisdiction of the courts located in Amsterdam,
                Netherlands.
              </Text>
            </View>
          </View>

          <View style={spacing.marginTop16}>
            <Text style={styles.semiheader16}>11. Changes to Terms</Text>

            <View style={spacing.marginTop8}>
              <Text style={styles.text16}>
                Aucarga reserves the right to modify or revise these terms and
                conditions at any time, in its sole discretion. Such changes
                shall be effective immediately upon posting on the website. Your
                continued use of the website or services following the posting
                of changes constitutes your acceptance of such changes.
              </Text>
            </View>
          </View>

          <View style={spacing.marginTop16}>
            <Text style={styles.semiheader16}>12. Severability</Text>

            <View style={spacing.marginTop8}>
              <Text style={styles.text16}>
                If any provision of these terms and conditions is found to be
                invalid, illegal, or unenforceable under any applicable law,
                such provision shall be deemed amended to achieve as nearly as
                possible the same economic effect as the original provision, and
                the remaining provisions shall continue in full force and
                effect.
              </Text>
            </View>
          </View>

          <View style={spacing.marginTop16}>
            <Text style={styles.semiheader16}>13. Entire Agreement</Text>

            <View style={spacing.marginTop8}>
              <Text style={styles.text16}>
                These terms and conditions, together with any additional terms
                and policies referenced herein, constitute the entire agreement
                between you and Aucarga regarding your use of the website and
                services, and supersede all prior or contemporaneous
                communications and proposals, whether oral or written, between
                you and Aucarga.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Terms;
