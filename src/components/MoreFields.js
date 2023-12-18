{
  /* <View style={styles.input_parent}>
          <View
            style={{
              padding: 10,
              borderWidth: 1,
              borderColor: "silver",
            }}
          >
            {contactInformation.other_fields.map((field, index) => {
              return (
                <View style={styles.input_parent} key={index}>
                  <Text style={styles.label}>{field.name}</Text>
                  <TextInput 
                  editable={!isEditing ? false : true}
                  
                    onChangeText={(value) => {
                      const newValue = contactInformation.other_fields;
                      newValue[index].value = value;
                      newValue[index].name = "XXXXX";
                      setContactInformation({
                        ...contactInformation,
                        other_fields: newValue,
                      });
                    }}
                    value={field.value}
                    style={[styles.text_input, {borderColor:"rgba2)"}]}
                    placeholder={"Enter " + field.name}
                  />
                </View>
              );
            })}

            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
              onPress={() => {
                const newValue = contactInformation.other_fields;
                newValue.push({ value: "AAAAAA", name: "Value" });
                setContactInformation({
                  ...contactInformation,
                  other_fields: newValue,
                });
              }}
            >
              <Ionicons name="add-circle" size={30} color="gray" />
              <Text style={[styles.label, { marginLeft: 5 }]}>
                Add New Field
              </Text>
            </TouchableOpacity>
          </View>
        </View> */
}
