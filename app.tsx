import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    ScrollView,
    Image,
    Dimensions
} from "react-native";

const { width } = Dimensions.get("window");

const App = () => {

    const friction: number = 4;

    const [active, setActive] = useState(0);
    const [xTabOne, setXTabOne] = useState(0);
    const [xTabTwo, setXTabTwo] = useState(0);
    const [translateX, setTranslateX] = useState(new Animated.Value(0));
    const [translateXTabOne, setTranslateXTabOne] = useState(new Animated.Value(0));
    const [translateXTabTwo, setTranslateXTabTwo] = useState(new Animated.Value(width));
    const [translateY, setTranslateY] = useState(-1000);

    const handleSlide = (type: any) => {

        Animated.spring(translateX, {
            toValue: type,
            friction: friction,
            useNativeDriver: true
        }).start();
        
        if (active === 0) {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: 0,
                    friction: friction,
                    useNativeDriver: true
                }),
                Animated.spring(translateXTabTwo, {
                    toValue: width,
                    friction: friction,
                    useNativeDriver: true
                })
            ]).start();
        } else {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: -width,
                    friction: friction,
                    useNativeDriver: true
                }),
                Animated.spring(translateXTabTwo, {
                    toValue: 0,
                    friction: friction,
                    useNativeDriver: true
                })
            ]).start();
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    width: "90%",
                    marginLeft: "auto",
                    marginRight: "auto"
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        marginTop: 40,
                        marginBottom: 20,
                        height: 36,
                        position: "relative"
                    }}
                >
                    <Animated.View
                        style={{
                            position: "absolute",
                            width: "50%",
                            height: "100%",
                            top: 0,
                            left: 0,
                            backgroundColor: "#007aff",
                            borderRadius: 4,
                            transform: [
                                {
                                    translateX
                                }
                            ]
                        }}
                    />
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            borderWidth: 1,
                            borderColor: "#007aff",
                            borderRadius: 4,
                            borderRightWidth: 0,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0
                        }}
                        onLayout={ event => setXTabOne(event.nativeEvent.layout.x) }
                        onPress={() => {
                                setActive(0);
                                handleSlide(xTabOne)
                            }    
                        }
                    >
                        <Text
                            style={{
                                color: active === 0 ? "#fff" : "#007aff"
                            }}
                        >
                            Tab One
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            borderWidth: 1,
                            borderColor: "#007aff",
                            borderRadius: 4,
                            borderLeftWidth: 0,
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0
                        }}
                        onLayout={event => setXTabTwo(event.nativeEvent.layout.x) }
                        onPress={() => {
                                setActive(1);
                                handleSlide(xTabTwo);
                            }
                        }
                    >
                        <Text
                            style={{
                                color: active === 1 ? "#fff" : "#007aff"
                            }}
                        >
                            Tab Two
                        </Text>
                    </TouchableOpacity>
                </View>

                <ScrollView>
                    <Animated.View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            transform: [
                                {
                                    translateX: translateXTabOne
                                }
                            ]
                        }}
                        onLayout={event => setTranslateY(event.nativeEvent.layout.height)}
                    >
                        <Text>Hi, I am a cute cat</Text>
                    </Animated.View>

                    <Animated.View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            transform: [
                                {
                                    translateX: translateXTabTwo
                                },
                                {
                                    translateY: -translateY
                                }
                            ]
                        }}
                    >
                        <Text>Hi, I am a cute dog</Text>
                    </Animated.View>
                </ScrollView>
            </View>
        </View>
    );
}

export default App;
